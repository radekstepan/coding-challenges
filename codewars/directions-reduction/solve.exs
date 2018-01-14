defmodule Directions do

  def reduce(directions), do: List.foldr(directions, [], &reduce/2)

  # Done.
  defp reduce(head, []), do: [head]
  # Fold.
  defp reduce("NORTH", ["SOUTH" | tail]), do: tail
  defp reduce("SOUTH", ["NORTH" | tail]), do: tail
  defp reduce("WEST", ["EAST" | tail]), do: tail
  defp reduce("EAST", ["WEST" | tail]), do: tail
  # Continue.
  defp reduce(head, [next | tail]), do: [head, next | tail]

end
