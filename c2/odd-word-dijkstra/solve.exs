#!/usr/bin/env elixir
defmodule Solve do

    @space " "

    def problem(input) do loopy input, [], 0, true end

    defp loopy(input, output, length, is_even) do
        bool_to_int = fn(bool) -> if bool do 1 else 0 end end

        case String.next_grapheme(input) do
            { @space, tail } -> loopy tail, output ++ [ @space ], 0, !is_even
            
            { head, tail } ->
                if is_even or length == 0 do
                    loopy tail, output ++ [ head ], bool_to_int.(!is_even), is_even
                else
                    loopy tail, List.insert_at(output, - length, head), length + 1, false
                end

            :no_grapheme -> String.from_char_list! output
        end
    end

end