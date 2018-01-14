defmodule DurationFormatter do
  @year 365
  @day 24

  def format_duration(0) do "now" end

  def format_duration(seconds) do
    format(seconds, [])
    |> Enum.map(fn [n, t] -> Enum.join([n, (if (n > 1), do: t <> "s", else: t)], " ") end)
    |> Enum.reverse
    |> Enum.intersperse(", ")
    |> List.replace_at(-2, " and ")
    |> Enum.join()
  end

  defp format(0, parts) do parts end

  defp format(seconds, parts) when seconds >= 60 * 60 * @day * @year do
    gen(seconds, parts, 60 * 60 * @day * @year, "year")
  end

  defp format(seconds, parts) when seconds >= 60 * 60 * @day do
    gen(seconds, parts, 60 * 60 * @day, "day")
  end

  defp format(seconds, parts) when seconds >= 60 * 60 do
    gen(seconds, parts, 60 * 60, "hour")
  end

  defp format(seconds, parts) when seconds >= 60 do
    gen(seconds, parts, 60, "minute")
  end

  defp format(seconds, parts) do [[seconds, "second"] | parts] end

  defp gen(seconds, parts, divisor, unit) do
    format(
      rem(seconds, divisor),
      [[div(seconds, divisor), unit] | parts]
    )
  end
end
