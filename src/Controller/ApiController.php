<?php
// src/Controller/ApiController.php

namespace App\Controller;

use App\Service\SongGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    //Songs API endpoint

    #[Route('/api/songs', name: 'api_songs', methods: ['GET'])]
    public function songs(Request $request, SongGenerator $generator): JsonResponse
    {
        
        $lang  = $request->query->get('lang', 'en');
        $seed  = (int)$request->query->get('seed', 1);
        $likes = (float)$request->query->get('likes', 5);
        $page  = (int)$request->query->get('page', 1);

        //Songs per page
        $limit = 20;

        $songs = $generator->generateSongs(
            lang: $lang,
            seed: $seed,
            likes: $likes,
            page: $page,
            limit: $limit
        );

        return $this->json([
            'page'  => $page,
            'limit' => $limit,
            'items' => $songs
        ]);
    }
}
