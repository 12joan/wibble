require 'test_helper'

DummyRNG = Struct.new(:numbers) do
  def rand(range)
    numbers.shift.tap do |n|
      raise "#{n} out of range #{range}" unless range.include?(n)
    end
  end

  def assert_all_used!
    raise "#{numbers.count} unused numbers" unless numbers.empty?
  end
end

class DiceRollerTest < ActiveSupport::TestCase
  test '1d20' do
    n = rand(1..20)

    assert_equal(
      {
        name: nil,
        notation: '1d20',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd20',
              used: true,
              value: n,
            },
          ],
          text: "1d20 (#{n})",
          value: n,
        },
      },
      roll('1d20', random: [n])
    )
  end

  test '2d20' do
    n1 = rand(1..20)
    n2 = rand(1..20)

    assert_equal(
      {
        name: nil,
        notation: '2d20',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd20',
              used: true,
              value: n1,
            },
            {
              type: 'die',
              dieType: 'd20',
              used: true,
              value: n2,
            },
          ],
          text: "2d20 (#{n1 + n2})",
          value: n1 + n2,
        },
      },
      roll('2d20', random: [n1, n2])
    )
  end

  test '1d6' do
    n = rand(1..6)

    assert_equal(
      {
        name: nil,
        notation: '1d6',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd6',
              used: true,
              value: n,
            },
          ],
          text: "1d6 (#{n})",
          value: n,
        },
      },
      roll('1d6', random: [n])
    )
  end

  private

  def roll(notation, random:)
    rng = DummyRNG.new(random)

    DiceRoller.perform_roll({ 'name' => nil, 'notation' => notation }, rng: rng).tap do
      rng.assert_all_used!
    end
  end
end
