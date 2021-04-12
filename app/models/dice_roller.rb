module DiceRoller
  def self.perform_roll(requested_roll, rng: SecureRandom)
    notation = requested_roll['notation']
    dice_count, sides = notation.match(/(?<count>\d+)d(?<sides>\d+)/).captures.map(&:to_i)

    ns = dice_count.times.map { rng.rand(1..sides) }

    {
      name: requested_roll['name'],
      notation: notation,
      result: {
        parts: ns.map do |n|
          {
            type: 'die',
            dieType: "d#{sides}",
            used: true,
            value: n,
          }
        end,
        text: "#{dice_count}d#{sides} (#{ns.sum})",
        value: ns.sum,
      },
    }
  end
end
