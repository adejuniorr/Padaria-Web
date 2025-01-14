<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Support\Facades\Log;

class PedidosSeeder extends Seeder
{
    public function run()
    {
        $pedidos = [
            // Pedido de João Silva
            ['id_cliente' => 1, 'id_produto' => 1, 'qtd_produto' => 5, 'data_hora' => '2024-03-15 10:23:45'],
            ['id_cliente' => 1, 'id_produto' => 4, 'qtd_produto' => 2, 'data_hora' => '2024-03-15 10:45:30'],
            // Pedido de Maria Oliveira
            ['id_cliente' => 2, 'id_produto' => 2, 'qtd_produto' => 1, 'data_hora' => '2024-06-10 14:05:12'],
            ['id_cliente' => 2, 'id_produto' => 6, 'qtd_produto' => 4, 'data_hora' => '2024-06-10 14:18:45'],
            // Pedido de Pedro Santos
            ['id_cliente' => 3, 'id_produto' => 7, 'qtd_produto' => 10, 'data_hora' => '2024-08-22 09:30:00'],
            // Pedido de Ana Costa
            ['id_cliente' => 4, 'id_produto' => 8, 'qtd_produto' => 1, 'data_hora' => '2024-11-05 17:20:10'],
            ['id_cliente' => 4, 'id_produto' => 9, 'qtd_produto' => 5, 'data_hora' => '2024-11-05 17:35:45'],
            // Pedido de Lucas Ferreira
            ['id_cliente' => 5, 'id_produto' => 1, 'qtd_produto' => 10, 'data_hora' => '2024-09-12 08:50:20'],
            // Pedido de Carla Almeida
            ['id_cliente' => 6, 'id_produto' => 5, 'qtd_produto' => 3, 'data_hora' => '2024-05-18 13:15:30'],
            // Pedido de Rafael Souza
            ['id_cliente' => 7, 'id_produto' => 3, 'qtd_produto' => 5, 'data_hora' => '2024-10-08 19:45:00'],
            // Pedido de Larissa Pereira
            ['id_cliente' => 8, 'id_produto' => 2, 'qtd_produto' => 2, 'data_hora' => '2024-12-21 16:10:25'],
            // Pedido de Carlos Lima
            ['id_cliente' => 9, 'id_produto' => 6, 'qtd_produto' => 3, 'data_hora' => '2024-07-04 11:20:30'],
            ['id_cliente' => 9, 'id_produto' => 10, 'qtd_produto' => 15, 'data_hora' => '2024-07-04 11:40:10'],
            // Pedido de Fernanda Nascimento (pedindo a mais doque a quantidade em estoque)
            ['id_cliente' => 10, 'id_produto' => 7, 'qtd_produto' => 45, 'data_hora' => '2024-02-27 18:05:45'],
        ];

        foreach ($pedidos as $pedido) {
            $produto = Produto::findOrFail($pedido['id_produto']);

            if ($produto && $produto->qtd_em_estoque >= $pedido['qtd_produto']) {
                Pedido::create($pedido);
                
                $produto->decrement('qtd_em_estoque', $pedido['qtd_produto']);
            } else {
                Log::warning("Estoque insuficiente para o produto.", [
                    'id_produto' => $pedido['id_produto'],
                    'qtd_em_estoque' => $produto->qtd_em_estoque ?? 'Produto não encontrado',
                    'qtd_solicitada' => $pedido['qtd_produto'],
                ]);   
            }
        }
    }
}