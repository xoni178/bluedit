<?php

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
        Schema::create("comment_votes", function (Blueprint $table) {
            $table->string("username");
            $table->foreign("username")->on("users")->references("username");
            $table->foreignId("comment_id");
            $table->foreign("comment_id")->on("comments")->references("id");
            $table->enum("vote_type", ["UPVOTE", "DOWNVOTE"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("comment_votes");
    }
};
