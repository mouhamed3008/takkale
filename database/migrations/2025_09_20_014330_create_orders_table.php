<?php

use App\Constants\CommandeType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');
            $table->foreignId('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->string('code');
            $table->string('status');
            $table->boolean('payment_status')->default(true);
            $table->string('type')->default("SIMPLE");
            $table->string('amount');
            $table->string('amount_received');
            $table->boolean('has_reduction')->default(false);
            $table->string('reduction')->nullable();
            $table->date('delivery_at');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
