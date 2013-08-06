#!/usr/bin/env elixir
defmodule Solve do

    @empty ""
    @space " "
    @eol "\n"

    def problem(input, length) do
        loopy input, length, @empty, 0, 0, @empty
    end

    defp loopy(input, length, buffer, word_l, line_l, output) do
        case String.next_grapheme(input) do
            # Save to the current or a new line.
            { @space, tail } ->
                # Empty buffer? Skip ahead.
                if word_l == 0 do
                    loopy tail, length, @empty, 0, word_l, output
                else
                    # Space for a space and this word?
                    new_l = line_l + 1 + word_l

                    if new_l > length do
                        loopy tail, length, @empty, 0, word_l, ( output <> @eol <> buffer )
                    else
                        # Beginning of the output?
                        if output == @empty do
                            loopy tail, length, @empty, 0, new_l, buffer
                        else
                            loopy tail, length, @empty, 0, new_l, ( output <> @space <> buffer )
                        end
                    end
                end
            
            # Save head to the word buffer.
            { head, tail } ->
                loopy tail, length, ( buffer <> head ), word_l + 1, line_l, output
            
            # We are done.
            :no_grapheme ->
                # Space for a space and this word?
                if ( line_l + 1 + String.length buffer ) > length do
                    output <> @eol <> buffer
                else
                    output <> @space <> buffer
                end
        end
    end

end