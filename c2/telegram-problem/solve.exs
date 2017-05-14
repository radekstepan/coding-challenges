#!/usr/bin/env elixir
defmodule Solve do

    @empty ""
    @space " "
    @eol "\n"

    def problem(input, length) do
        loopy input, length, @empty, 0, 0, @empty
    end

    defp loopy(input, length, buffer, word_l, line_l, output) do
        # Connect two strings on a separator.
        append = fn(a, b, sep) -> a <> sep <> b end

        # Feed a new char in.
        case String.next_grapheme(input) do
            # Save to the current or a new line.
            { @space, tail } ->
                cond do
                    # Empty buffer? Skip ahead.
                    word_l == 0 ->
                        new_line_l = line_l
                        out = output

                    # No more space? Add to the new line.
                    ( this_l = line_l + 1 + word_l ) > length ->
                        new_line_l = word_l
                        out = append.(output, buffer, @eol)

                    # Add to this line then.
                    true ->
                        new_line_l = this_l
                        # Beginning of the output?
                        if output == @empty do
                            out = buffer
                        else
                            out = append.(output, buffer, @space)
                        end
                end

                loopy tail, length, @empty, 0, new_line_l, out
            
            # Save head to the word buffer.
            { head, tail } ->
                loopy tail, length, ( buffer <> head ), word_l + 1, line_l, output
            
            # We are done.
            :no_grapheme ->
                # Space for a space and this word?
                if ( line_l + 1 + word_l ) > length do
                    append.(output, buffer, @eol)
                else
                    append.(output, buffer, @space)
                end
        end
    end

end