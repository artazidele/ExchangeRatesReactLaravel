<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class AddRateAUD extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-rate-a-u-d';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::get('https://anyapi.io/api/v1/exchange/convert?base=EUR&to=AUD&amount=1&apiKey=<API_KEY>');
        $jsonData = $response->json(); 
        $data['date'] = now()->format('d.m.Y');
        $data['to'] = 'AUD';
        $data['rate'] = $jsonData['rate'];
        $data['created_at'] = now()->format('Y-m-d H:i:s');
        $data['updated_at'] = now()->format('Y-m-d H:i:s');
        DB::table('rates')->insert($data);

        $this->info('Success');
    }
}
