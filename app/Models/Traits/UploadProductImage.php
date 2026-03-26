<?php

namespace App\Models\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait UploadProductImage
{

    /**
     * Handle the upload of an image and attach it to the model.
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $attribute
     * @return void
     */
    public function uploadImage(UploadedFile $file, string $attribute = 'image'): void
    {
        if ($this->{$attribute} && Storage::disk('public')->exists($this->{$attribute})) {
            Storage::disk('public')->delete($this->{$attribute});
        }

        $filename = Str::uuid()->toString() . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('products', $filename, 'public');

        $this->{$attribute} = $path;
        $this->save();
    }

    public function storeImage(UploadedFile $file): string
    {
        $filename = Str::uuid()->toString() . '.' . $file->getClientOriginalExtension();
        return $file->storeAs('products', $filename, 'public');
    }
}
