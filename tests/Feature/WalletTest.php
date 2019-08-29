<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Wallet;
use App\Transfer;

class WalletTest extends TestCase
{
    use RefreshDatabase;
    
    /**
     * A basic feature test example.
     *
     * @return void
     */

    
    public function testGetWallet()
    {
        // accedo a mi modelo de wallet y creo un registro en la bd
        $wallet = factory(Wallet::class)->create();
        //accedo a mi omdelo de transfer y creo 3 registro en la bd sustituyendo el campo de wallet id com en registro de wallet que se creó recientemente
        $transfer = factory(Transfer::class, 3)->create([
            'wallet_id' => $wallet->id
        ]);
            // se responde a esta URL
        $response = $this->json('GET','/api/wallet');
            // validadno la respuesta
        $response->assertStatus(200)
                ->assertJsonStructure([
            'id', 'money','transfers' => [
                '*' => [
                    'id' ,'amount','description','wallet_id'
                ]
            ]
        ]);

        // contando que los tansfers que envio (deben ser 3)  
        $this->assertCount(3, $response->json()['transfers']);

    }
}
