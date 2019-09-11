<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transfer;
use App\Wallet;

class TransferController extends Controller
{
    public function store(Request $req)
    {
        //aunque siempre es la misma cartera, id:4 $req->wallet_id
        $wallet = Wallet::findOrFail(1);
        $wallet->money = $wallet->money + $req->amount;
        $wallet->update();

        $transfer = new Transfer();
        $transfer->description = $req->description;
        $transfer->amount = $req->amount;
        $transfer->wallet_id = 1;
        $transfer->save();

        return response()->json($transfer, 201);
    }

    public function delete(Request $req)
    {
        //recupero laúnica cartera que se tiene
        $wallet = Wallet::findOrFail(1);
        //encuentro la transferencia por el id que envio desde el front-end
        $transfer = Transfer::findOrFail($req->id);
        $wallet->money -= $transfer->amount;
        $wallet->update();
        
        $transfer->delete();
        // return response()->json($transfer, 201);
        $restTransfer = Transfer::all();
        return response()->json($restTransfer, 201);
    }

}
