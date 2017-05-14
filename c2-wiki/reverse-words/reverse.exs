#!/usr/bin/env elixir
defmodule Reverse do

    @empty ""
    @space " "

    @doc """
    Reverse a string.
    """
    def string(input) do
        string input, @empty
    end

    defp string(input, output) do
        case String.next_grapheme(input) do
            { head, tail } -> string tail, head <> output
            :no_grapheme ->   output
        end
    end

    @doc """
    Reverse words in a string.
    """
    def words(input) do
        words input, @empty, @empty
    end

    defp words(input, buffer, output) do
        case String.next_grapheme(input) do
            { @space, tail } -> words tail, @empty, output <> string(buffer) <> @space
            { head, tail } ->   words tail, buffer <> head, output
            :no_grapheme ->     output <> string buffer
        end
    end

    @doc """
    Reverse order of words in a string.
    """
    def order(input) do
        order input, @empty, @empty
    end

    defp order(input, buffer, output) do
        case String.next_grapheme(input) do
            { @space, tail } -> order tail, @empty, @space <> buffer <> output
            { head, tail } ->   order tail, buffer <> head, output
            :no_grapheme ->     buffer <> output
        end
    end

end