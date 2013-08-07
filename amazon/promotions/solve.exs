#!/usr/bin/env elixir
defmodule Checkout do

    # All the products the store carries.
    @products HashDict.new [
        { "001", { :name, "Lavender heart",         :cost, 9.25  } },
        { "002", { :name, "Personalised cufflinks", :cost, 45.00 } },
        { "003", { :name, "Kids T-shirt",           :cost, 19.95 } }
    ]

    # Create a new basket.
    def new() do
        HashDict.new()
    end

    # Add an item into the basket.
    def add({ :sku, sku }, basket) do
        HashDict.put basket, sku, HashDict.get(basket, sku, 0) + 1
    end

    # Round to the nearest pence.
    defp format(n) do round(n * 100) / 100 end

    # Get the total for the basket with promotions applied. 
    def total(basket) do        
        # Get the total for the line and apply a discount maybe?
        per_item = fn({ sku, count }, total) ->
            case HashDict.get(@products, sku, :not_found) do
                { :name, _, :cost, cost } ->
                    # Apply discount too maybe?
                    promotion {
                        :total, total + (count * cost),
                        :sku, sku,
                        :count, count
                    }
                
                :not_found ->
                    IO.puts "Product `#{sku}` no longer in the store"
                    total
            end
        end

        # Calculate the total, maybe apply a discount on the total and format.
        { :total, Enum.reduce(basket, 0, per_item) } |> promotion |> format
    end

    # .75 off Lavender hearts when buying 2 or more.
    defp promotion({ :total, total, :sku, "001", :count, count }) when count >= 2 do
        total - ( 0.75 * count )
    end

    # No discount on other items.
    defp promotion({ :total, total, :sku, _, :count, _ }) do total end

    # 10% off over 60.
    defp promotion({ :total, total }) when total > 60 do
        total * 0.9
    end

    # Spend moar.
    defp promotion({ :total, total }) do total end

end