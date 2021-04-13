require 'strscan'

module DiceRoller
  def self.perform_roll(requested_roll, rng: SecureRandom)
    unparsed_notation = requested_roll['notation']

    notation = parse_notation(unparsed_notation)

    {
      name: requested_roll['name'],
      notation: unparsed_notation,
      result: notation.result(rng: rng),
    }
  end

  private

  def self.parse_notation(notation)
    s = StringScanner.new(notation)

    parts = []
    advantage_type = :normal

    until s.eos?
      case
      when part = s.scan(/(\+ *)?\d*d\d+/)
        parts << parse_die_part(part)
      when part = s.scan(/([+-] *)?\d+/)
        parts << parse_modifier_part(part)
      else
        case s.scan(/[^ ]* */)
        when /dis/
          advantage_type = :disadvantage
        when /adv/
          advantage_type = :advantage
        end
      end
    end

    Notation.new(parts: parts, advantage_type: advantage_type)
  end

  def self.parse_die_part(notation)
    dice_count, sides = notation.match(/(?<count>\d*)d(?<sides>\d+)/).captures
    Part::Dice.new(dice_count.presence&.to_i || 1, sides.to_i)
  end

  def self.parse_modifier_part(notation)
    Part::Modifier.new(notation.delete(' ').to_i)
  end

  class Notation
    attr_reader :parts, :advantage_type

    def initialize(parts:, advantage_type:)
      @parts = parts
      @advantage_type = advantage_type
    end

    def result(rng:)
      part_results = parts.map { |part| part.result(rng: rng, advantage_type: advantage_type) }

      advantage_tag = {
        normal: '',
        advantage: ' [advantage]',
        disadvantage: ' [disadvantage]'
      }.fetch(advantage_type)

      {
        parts: part_results.flat_map(&:data),
        text: part_results.map.with_index do |result, i|
          result.text.(with_sign: i > 0)
        end.join(' ') + advantage_tag,
        value: part_results.map(&:value).sum,
      }
    end
  end

  PartResult = Struct.new(:value, :text, :data, keyword_init: true)

  class Part
    class Dice < Part
      def initialize(count, sides)
        @count = count
        @sides = sides
      end

      def result(rng:, advantage_type: :normal)
        if advantage_type != :normal && @count == 1 && @sides == 20
          dis_advantage_result(rng: rng, advantage_type: advantage_type)
        else
          normal_result(rng: rng)
        end
      end

      private

      def normal_result(rng:)
        die_values = @count.times.map { rng.rand(1..@sides) }

        value = die_values.sum

        PartResult.new(
          value: value,

          text: -> (with_sign: false) do
            sign = with_sign ? '+ ' : ''
            "#{sign}#{@count}d#{@sides} (#{value})"
          end,

          data: die_values.map do |value|
            {
              type: 'die',
              dieType: 'd' + @sides.to_s,
              used: true,
              value: value,
            }
          end,
        )
      end

      def dis_advantage_result(rng:, advantage_type:)
        die_values = 2.times.map { rng.rand(1..@sides) }

        value =
         case advantage_type
         when :advantage
           die_values.max
         when :disadvantage
           die_values.min
         end

        value_index = die_values.index(value)

        PartResult.new(
          value: value,

          text: -> (with_sign: false) do
            sign = with_sign ? '+ ' : ''
            "#{sign}#{@count}d#{@sides} (#{die_values.join(', ')})"
          end,

          data: die_values.map.with_index do |value, i|
            {
              type: 'die',
              dieType: 'd' + @sides.to_s,
              used: value_index == i,
              value: value,
            }
          end,
        )
      end
    end

    class Modifier < Part
      def initialize(value)
        @value = value
      end

      def result(rng:, advantage_type: :normal)
        PartResult.new(
          value: @value,

          text: -> (with_sign: false) do
            case
            when @value.negative?
              '- '
            when with_sign
              '+ '
            else
              ''
            end + @value.abs.to_s
          end,

          data: [
            {
              type: 'modifier',
              used: true,
              value: @value,
            }
          ],
        )
      end
    end
  end
end
