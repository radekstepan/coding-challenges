#!/usr/bin/env elixir
defmodule Solve do

    def problem(input) do
        loopy input, nil, []
    end

    defp loopy(input, buffer, list) do
        # Take the item from the input.
        case String.next_grapheme(input) do
            { head, tail } ->
                # Empty buffer?
                if buffer == nil do
                    loopy tail, { head, 1 }, list
                else
                    # What is the item in the buffer?
                    { previous, count } = buffer

                    # The same as before?
                    if head == previous do
                        loopy tail, { previous, count + 1 }, list

                    # Different; move the buffer and init a new one.
                    else
                        loopy tail, { head, 1 }, list ++ [ buffer ]
                    end
                end
            
            :no_grapheme ->
                # Append the last buffer.
                list ++ [ buffer ]
        end
    end

end