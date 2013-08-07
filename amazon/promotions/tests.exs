#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "first" do
        basket = Checkout.new()
        basket = Checkout.add { :sku, "001" }, basket
        basket = Checkout.add { :sku, "002" }, basket
        basket = Checkout.add { :sku, "003" }, basket
        assert Checkout.total(basket) == 66.78
    end

    test "second" do
        basket = Checkout.new()
        basket = Checkout.add { :sku, "001" }, basket
        basket = Checkout.add { :sku, "003" }, basket
        basket = Checkout.add { :sku, "001" }, basket
        assert Checkout.total(basket) == 36.95
    end

    test "third" do
        basket = Checkout.new()
        basket = Checkout.add { :sku, "001" }, basket
        basket = Checkout.add { :sku, "002" }, basket
        basket = Checkout.add { :sku, "001" }, basket
        basket = Checkout.add { :sku, "003" }, basket
        assert Checkout.total(basket) == 73.76
    end

end