require 'strscan'

module DiceRoller
  def self.perform_roll(requested_roll, rng: SecureRandom)
    unparsed_notation = requested_roll['notation']

    notation = parse_notation(unparsed_notation)

    {
      name: requested_roll['name'],
      notation: unparsed_notation,
      result: notation.result!(rng: rng),
    }
  end

  private

  def self.parse_notation(notation)
    s = StringScanner.new(notation.delete(" \t"))

    parts = []

    until s.eos?
      case
      when part = s.scan(/\+?\d*d\d+/)
        parts << parse_die_part(part)
      when part = s.scan(/[+-]?\d+/)
        parts << parse_modifier_part(part)
      end
    end

    Notation.new(parts)
  end

  def self.parse_die_part(notation)
    dice_count, sides = notation.match(/(?<count>\d*)d(?<sides>\d+)/).captures
    Part::Dice.new(dice_count.presence&.to_i || 1, sides.to_i)
  end

  def self.parse_modifier_part(notation)
    Part::Modifier.new(notation.to_i)
  end

  class Notation
    attr_reader :parts

    def initialize(parts)
      @parts = parts
    end

    def result!(rng:)
      roll_dice!(rng: rng)

      {
        parts: parts.flat_map(&:result),
        text: parts.map.with_index { |part, i| part.text(with_sign: i > 0) }.join(' '),
        value: parts.map(&:value).sum,
      }
    end

    private

    def roll_dice!(rng:)
      parts.filter { |p| p.is_a?(Part::Dice) }.map { |p| p.roll!(rng: rng) }
    end
  end

  class Part
    class Dice < Part
      def initialize(count, sides)
        @count = count
        @sides = sides
      end

      def roll!(rng:)
        @die_values = @count.times.map { rng.rand(1..@sides) }
      end

      def value
        @die_values.sum
      end

      def text(with_sign: false)
        sign = with_sign ? '+ ' : ''
        "#{sign}#{@count}d#{@sides} (#{value})"
      end

      def result
        @die_values.map do |value|
          {
            type: 'die',
            dieType: 'd' + @sides.to_s,
            used: true,
            value: value,
          }
        end
      end
    end

    class Modifier < Part
      attr_reader :value

      def initialize(value)
        @value = value
      end

      def text(with_sign: false)
        sign =
          case
          when value.negative?
            '- '
          when with_sign
            '+ '
          else
            ''
          end

        sign + value.abs.to_s
      end

      def result
        [
          {
            type: 'modifier',
            used: true,
            value: value,
          }
        ]
      end
    end
  end
end
