#!/usr/bin/env elixir
defmodule Solve do

    @empty ""
    @space " "
    @newline "\n"

    def problem(input, length) do
        loopy input, length, @empty, 0, @empty
    end

    defp loopy(input, length, buffer, line_l, output) do
        case String.next_grapheme(input) do
            # Save to the current or a new line.
            { @space, tail } ->
                # Ok, the word is done.
                word_l = String.length buffer

                # Empty buffer? Skip ahead.
                if word_l == 0 do
                    loopy tail, length, @empty, word_l, output
                else
                    # Space for a space and this word?
                    new_l = line_l + 1 + word_l

                    if new_l > length do
                        loopy tail, length, @empty, word_l, ( output <> @newline <> buffer )
                    else
                        # Beginning of the output?
                        if output == @empty do
                            loopy tail, length, @empty, new_l, buffer
                        else
                            loopy tail, length, @empty, new_l, ( output <> @space <> buffer )
                        end
                    end
                end
            
            # Save head to the word buffer.
            { head, tail } ->
                loopy tail, length, ( buffer <> head ), line_l, output
            
            # We are done.
            :no_grapheme ->
                # Space for a space and this word?
                if ( line_l + 1 + String.length buffer ) > length do
                    output <> @newline <> buffer
                else
                    output <> @space <> buffer
                end
        end
    end

end