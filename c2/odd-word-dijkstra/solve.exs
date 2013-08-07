#!/usr/bin/env elixir
defmodule Solve do

    @space " "

    def problem(input) do
        loopy input, [], 0, true
    end

    defp loopy(input, output, length, even) do
        case String.next_grapheme(input) do
            { @space, tail } -> loopy tail, output ++ [ @space ], 0, !even
            
            { head, tail } ->
                cond do
                    even ->
                        loopy tail, output ++ [ head ], 0, true
                    !even && length == 0 ->
                        loopy tail, output ++ [ head ], 1, false
                    true ->
                        loopy tail, List.insert_at(output, - length, head), length + 1, false
                end

            :no_grapheme -> String.from_char_list! output
        end
    end

end