<?php

namespace App\Service;

#Faker library is used for generating dummy data simply
use Faker\Factory;

class SongGenerator
{
    public function generateSongs(string $lang, int $seed, float $likes, int $page, int $limit): array
    {
        //Set Local
        $locale = $lang === 'ge' ? 'ka_GE' : 'en_US';


        $faker = Factory::create($locale);

        // Seed generation including page numbers
        $finalSeed = $seed + $page * 100;
        $faker->seed($finalSeed);

        $songs = [];

        for ($i = 1; $i <= $limit; $i++) {

            $index = ($page - 1) * $limit + $i;

            $songs[] = [
                'index' => $index,
                'title' => $faker->sentence(3),
                'artist' => $faker->name(),
                'album' => $faker->boolean(70) ? $faker->sentence(2) : 'Single',
                'genre' => $faker->word(),
                'likes' => $this->generateLikes($likes),
            ];
        }

        return $songs;
    }

    private function generateLikes(float $avg): int
    {
        if ($avg === 0) return 0;

        $int = floor($avg);
        $fraction = $avg - $int;

        return mt_rand() / mt_getrandmax() < $fraction
            ? $int + 1
            : $int;
    }
}
