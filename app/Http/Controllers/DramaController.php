<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DramaController extends Controller
{
    public function index(Request $request, $category = 'korea')
    {
        $page = $request->input('page', 1);
        $search = $request->input('search');

        try {
            if ($search) {
                $apiUrl = "https://api.sonzaix.indevs.in/drama/search?q={$search}&page={$page}";
            } else {
                $apiUrl = "https://api.sonzaix.indevs.in/drama/home/{$category}?page={$page}";
            }

            $response = Http::timeout(10)->get($apiUrl);
            $data = $response->json() ?? [];
        } catch (\Exception $e) {
            $data = [];
        }

        return Inertia::render('Drama/Index', [
            'dramas' => $data['data'] ?? [],
            'currentPage' => (int) $page,
            'searchTerm' => $search,
            'currentCategory' => $category,
            'totalCount' => $data['count'] ?? 0
        ]);
    }

    public function show($id)
    {
        try {
            $apiUrl = "https://api.sonzaix.indevs.in/drama/info?id={$id}";
            $response = Http::timeout(10)->get($apiUrl);
            $data = $response->json() ?? [];
        } catch (\Exception $e) {
            $data = ['title' => 'Error', 'data_episode' => [], 'image' => '', 'hits' => '0', 'category' => '', 'total_episode' => 0, 'meta_time' => ''];
        }

        // Remove author and contact
        unset($data['author'], $data['contact']);

        return Inertia::render('Drama/Show', [
            'drama' => $data
        ]);
    }

    public function watch($drama_id, $streaming_id)
    {
        try {
            // 1. Fetch Drama Info (for title and metadata)
            $infoUrl = "https://api.sonzaix.indevs.in/drama/info?id={$drama_id}";
            $infoResponse = Http::timeout(10)->get($infoUrl);
            $dramaData = $infoResponse->json() ?? [];
        } catch (\Exception $e) {
            $dramaData = ['title' => 'Error', 'data_episode' => [], 'id' => $drama_id, 'image' => ''];
        }

        try {
            // 2. Fetch Stream Info (for video links) using streaming id
            $streamUrl = "https://api.sonzaix.indevs.in/drama/stream?id={$streaming_id}";
            $streamResponse = Http::timeout(10)->get($streamUrl);
            $streamData = $streamResponse->json() ?? [];
        } catch (\Exception $e) {
            $streamData = ['data_stream' => []];
        }

        // Remove author and contact
        unset($dramaData['author'], $dramaData['contact']);
        unset($streamData['author'], $streamData['contact']);

        // Find current episode label for cleaner title using streaming id
        $currentEpisode = collect($dramaData['data_episode'] ?? [])
            ->firstWhere('streaming', $streaming_id);

        return Inertia::render('Drama/Stream', [
            'drama' => $dramaData,
            'stream' => $streamData,
            'currentEpisode' => $currentEpisode,
            'id' => $streaming_id
        ]);
    }

    public function popular()
    {
        // To provide a truly popular list, we fetch the first 2 pages and then sort them by hits
        $allDramas = collect();
        
        for ($i = 1; $i <= 2; $i++) {
            try {
                $apiUrl = "https://api.sonzaix.indevs.in/drama/home/korea?page={$i}";
                $response = Http::timeout(10)->get($apiUrl);
                $pageData = $response->json();
                if (isset($pageData['data'])) {
                    $allDramas = $allDramas->merge($pageData['data']);
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        // Sort by hits (as numeric) in descending order
        $popularDramas = $allDramas->sortByDesc(function($drama) {
            return (int) ($drama['hits'] ?? 0);
        })->values()->take(20); // Take the top 20 across these pages

        return Inertia::render('Drama/Popular', [
            'dramas' => $popularDramas,
            'currentPage' => 1,
            'totalCount' => count($popularDramas)
        ]);
    }
}
