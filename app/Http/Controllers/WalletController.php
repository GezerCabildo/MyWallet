<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Wallet;

class WalletController extends Controller
{
    public function index()
    {
        $wallet = Wallet::firstOrFail(); //encuentra el primer registro de la tabla wallet
        return response()->json($wallet->load('transfers'),200); //responde con una relación en los modelos y un estado
    }
}
