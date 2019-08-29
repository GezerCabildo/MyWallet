<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Wallet;
use App\Transfer;

class TransferTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testPostTransfer()
    {
        //crea unr regsitro de wallet en la tabal wallet
        $wallet = factory(Wallet::class)->create();
        // crea un registro en memoria de transfer
        $transfer = factory(Transfer::class)->make();

        //peticion que se realiza al servidor y lo que va a enviar
        $response = $this->json('POST','/api/transfer',[
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' =>$wallet->id
        ]);

        //validación de la respuesta, 201 los registro se agregron con éxito
        $response->assertJsonStructure([
            'id','description','amount','wallet_id'
        ])->assertStatus(201); 

        $this->assertDatabaseHas('transfers',[
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' =>$wallet->id
        ]);

        $this->assertDatabaseHas('wallets',[
            'id' => $wallet->id,
            'money' => $wallet->money + $transfer->amount
        ]);

    }
}
