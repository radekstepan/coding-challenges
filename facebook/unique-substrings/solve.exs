#!/usr/bin/env elixir
defmodule Solve do

    def problem(input) do
        len = String.length(input) - 1
        loopy(0, len, len, input, HashSet.new([]))
    end

    defp loopy(i, j, len, input, output) do
        cond do
            # The end.
            i > len ->
                Set.size(output)
            
            # Move `i`, reset `j`, discard now useless char.
            i > j ->
                { _, remainder } = String.next_grapheme(input)
                loopy(i + 1, len, len, remainder, output)
            
            # Otherwise go down with `j` after saving the substring.
            true ->
                output = Set.put(output, String.slice(input, 0, len - j + 1))
                loopy(i, j - 1, len, input, output)
        end
    end

end