defmodule SumOfPairs do

  def sum(list, result), do: find(list, result, MapSet.new)

  defp find([], _, _), do: nil

  defp find([b | tail], result, set) do
    a = result - b
    if MapSet.member?(set, a) do
      {a, b}
    else
      find(tail, result, MapSet.put(set, b))
    end
  end

end
