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

  test '1d8 + 2d6' do
    n1 = rand(1..8)
    n2 = rand(1..6)
    n3 = rand(1..6)

    assert_equal(
      {
        name: nil,
        notation: '1d8 + 2d6',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd8',
              used: true,
              value: n1,
            },
            {
              type: 'die',
              dieType: 'd6',
              used: true,
              value: n2,
            },
            {
              type: 'die',
              dieType: 'd6',
              used: true,
              value: n3,
            },
          ],
          text: "1d8 (#{n1}) + 2d6 (#{n2 + n3})",
          value: n1 + n2 + n3,
        },
      },
      roll('1d8 + 2d6', random: [n1, n2, n3])
    )
  end

  test '1d8 + 2d6 + 5' do
    n1 = rand(1..8)
    n2 = rand(1..6)
    n3 = rand(1..6)

    assert_equal(
      {
        name: nil,
        notation: '1d8 + 2d6 + 5',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd8',
              used: true,
              value: n1,
            },
            {
              type: 'die',
              dieType: 'd6',
              used: true,
              value: n2,
            },
            {
              type: 'die',
              dieType: 'd6',
              used: true,
              value: n3,
            },
            {
              type: 'modifier',
              used: true,
              value: 5,
            },
          ],
          text: "1d8 (#{n1}) + 2d6 (#{n2 + n3}) + 5",
          value: n1 + n2 + n3 + 5,
        },
      },
      roll('1d8 + 2d6 + 5', random: [n1, n2, n3])
    )
  end

  test '1d20 - 2' do
    n = rand(1..20)

    assert_equal(
      {
        name: nil,
        notation: '1d20 - 2',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd20',
              used: true,
              value: n,
            },
            {
              type: 'modifier',
              used: true,
              value: -2,
            },
          ],
          text: "1d20 (#{n}) - 2",
          value: n - 2,
        },
      },
      roll('1d20 - 2', random: [n])
    )
  end

  test '5 - 2 + 1 + 8' do
    assert_equal(
      {
        name: nil,
        notation: '5 - 2 + 1 + 8',
        result: {
          parts: [
            {
              type: 'modifier',
              used: true,
              value: 5,
            },
            {
              type: 'modifier',
              used: true,
              value: -2,
            },
            {
              type: 'modifier',
              used: true,
              value: 1,
            },
            {
              type: 'modifier',
              used: true,
              value: 8,
            },
          ],
          text: '5 - 2 + 1 + 8',
          value: 12,
        },
      },
      roll('5 - 2 + 1 + 8', random: [])
    )
  end

  test 'roll 1d20 - 2 please' do
    n = rand(1..20)

    assert_equal(
      {
        name: nil,
        notation: 'roll 1d20 - 2 please',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd20',
              used: true,
              value: n,
            },
            {
              type: 'modifier',
              used: true,
              value: -2,
            },
          ],
          text: "1d20 (#{n}) - 2",
          value: n - 2,
        },
      },
      roll('roll 1d20 - 2 please', random: [n])
    )
  end

  test '1d20 - 2 with Advantage' do
    n1 = 14
    n2 = 9

    assert_equal(
      {
        name: nil,
        notation: '1d20 - 2 with Advantage',
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
              used: false,
              value: n2,
            },
            {
              type: 'modifier',
              used: true,
              value: -2,
            },
          ],
          text: "1d20 (#{n1}, #{n2}) - 2 [advantage]",
          value: n1 - 2,
        },
      },
      roll('1d20 - 2 with Advantage', random: [n1, n2])
    )
  end

  test '1d20 - 2 with disadvantage' do
    n1 = 14
    n2 = 9

    assert_equal(
      {
        name: nil,
        notation: '1d20 - 2 with disadvantage',
        result: {
          parts: [
            {
              type: 'die',
              dieType: 'd20',
              used: false,
              value: n1,
            },
            {
              type: 'die',
              dieType: 'd20',
              used: true,
              value: n2,
            },
            {
              type: 'modifier',
              used: true,
              value: -2,
            },
          ],
          text: "1d20 (#{n1}, #{n2}) - 2 [disadvantage]",
          value: n2 - 2,
        },
      },
      roll('1d20 - 2 with disadvantage', random: [n1, n2])
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
