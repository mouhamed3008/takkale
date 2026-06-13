<?php

use App\Models\Category;
use App\Models\Product;
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
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')
                ->nullable()
                ->after('company_id')
                ->constrained()
                ->cascadeOnDelete();
        });

        Product::query()
            ->whereNull('category_id')
            ->each(function (Product $product) {
                $category = Category::query()->firstOrCreate(
                    [
                        'name' => 'Général',
                        'company_id' => $product->company_id,
                    ],
                    [
                        'user_id' => $product->user_id,
                    ],
                );

                $product->update(['category_id' => $category->id]);
            });

        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};
