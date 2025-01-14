<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pedido;

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_cliente' => 'required|exists:clientes,id',
            'id_produto' => 'required|exists:produtos,id',
            'qtd_produto' => 'required|numeric|min:1',
            'data_hora' => 'required|date_format:Y-m-d H:i:s',
        ]);

        try {
            $produto = Produto::findOrFail($validatedData['id_produto']);

            if ($produto->qtd_em_estoque < $validatedData['qtd_produto']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quantidade de produto em estoque insuficiente.',
                ], 400);
            }

            $pedido = Pedido::create($validatedData);

            $produto->decrement('qtd_em_estoque', $validatedData['qtd_produto']);

            return response()->json([
                'success' => true,
                'pedido' => $pedido,
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao inserir pedido: ' . $e->getMessage(),
            ], 400);
        }
    }
}