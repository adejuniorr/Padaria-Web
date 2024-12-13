<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produto;

class ProdutoController extends Controller
{
    // Listar todos os produtos
    public function index()
    {
        $produtos = Produto::all();

        foreach ($produtos as $produto) {
            if ($produto->imagem) {
                $produto->imagem = asset('storage/' . $produto->imagem);
            }
        }

        return response()->json([
            'success' => true,
            'data' => $produtos,
        ]);
    }


    // Criar novo produto
    public function store(Request $request)
    {        
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'categoria' => 'required|in:Pães,Doces,Salgados',
            'descricao' => 'nullable|string',
            'preco' => 'required|numeric|min:0',
            'imagem' => 'nullable|file|mimes:jpeg,jpg,png,avif|max:2048'
        ]);
        
        $produto = Produto::create($validatedData);

        if ($request->hasFile('imagem')) {
            $path = $request->file('imagem')->store('produtos', 'public');
            $produto->imagem = $path;
            $produto->save();
        }

        return response()->json([
            'produto' => [
                'id' => $produto->id,
                'nome' => $produto->nome,
                'categoria' => $produto->categoria,
                'descricao' => $produto->descricao,
                'preco' => $produto->preco,
                'imagem' => $produto->imagem ? asset('storage/' . $produto->imagem) : null,
            ],
        ], 201);
    }

    // Exibir produto específico
    public function show($id)
    {
        $produto = Produto::find($id);
        if (!$produto) {
            return response()->json([
                'success' => false,
                'message' => '[SHOW]: Produto pesquisado não existe',
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $produto,
        ]);
    }

    // Atualizar produto
    public function update(Request $request, $id)
    {
        $produto = Produto::find($id);
        
        if (!$produto) {
            return response()->json([
                'success' => false,
                'message' => '[UPDATE]: Produto pesquisado não existe',
            ], 404);
        }

        $validatedData = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'categoria' => 'sometimes|required|in:Pães,Doces,Salgados',
            'descricao' => 'nullable|string',
            'preco' => 'sometimes|required|numeric|min:0',
            'imagem' => 'nullable|file|mimes:jpeg,png,jpg,svg|max:2048',
        ]);
        
        $produto->update($validatedData);
        return response()->json([
            'success' => true,
            'data' => $produto,
        ]);
    }

    // Deletar produto
    public function destroy($id)
    {
        $produto = Produto::find($id);
        
        if ($produto) {
            $produto->delete();
            return response()->json([
                'success' => true,
                'message' => '[DELETE]: Produto deletado com sucesso',
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => '[DELETE]: Produto pesquisado não existe',
        ], 404);
        
    }
}