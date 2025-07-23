import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './youtube.module.css';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration?: string;
  viewCount?: string;
}

interface YouTubeAPIResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }>;
}

// Configuration: Use environment variables in production, fallback to config file in development
let YOUTUBE_CHANNEL_ID: string;
let YOUTUBE_API_KEY: string;

try {
  // First try environment variables (production)
  if (process.env.REACT_APP_YOUTUBE_CHANNEL_ID && process.env.REACT_APP_YOUTUBE_API_KEY) {
    YOUTUBE_CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
    YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  } else {
    // Fallback to config file (development)
    const { YOUTUBE_CONFIG } = require('../config/youtube.config');
    YOUTUBE_CHANNEL_ID = YOUTUBE_CONFIG.CHANNEL_ID;
    YOUTUBE_API_KEY = YOUTUBE_CONFIG.API_KEY;
  }
} catch (error) {
  // If config file doesn't exist, set to empty (will use fallback videos)
  YOUTUBE_CHANNEL_ID = '';
  YOUTUBE_API_KEY = '';
}

// Fallback videos in case API fails or for development
const fallbackVideos: YouTubeVideo[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Migrating Azure Functions from .NET 6 to .NET 8',
    description: 'A step-by-step guide on migrating your Azure Functions from .NET 6 to .NET 8, including all the gotchas and code changes.',
    publishedAt: '2025-07-23T10:00:00Z',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '12:34'
  },
  {
    id: 'example123',
    title: 'Understanding Dependency Injection in C#',
    description: 'Watch me explain dependency injection in C# while making terrible coding mistakes you can learn from!',
    publishedAt: '2025-07-03T10:00:00Z',
    thumbnail: 'https://img.youtube.com/vi/example123/maxresdefault.jpg',
    duration: '15:22'
  },
  {
    id: 'sample456',
    title: 'Building Blazor Apps with Azure Functions',
    description: 'Creating a church onboarding app using Blazor frontend and Azure Functions backend.',
    publishedAt: '2025-06-15T10:00:00Z',
    thumbnail: 'https://img.youtube.com/vi/sample456/maxresdefault.jpg',
    duration: '18:45'
  }
];

function YouTubeVideoCard({ video }: { video: YouTubeVideo }) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.id}`;
  
  return (
    <div className={styles.videoCard}>
      <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
        <div className={styles.thumbnailContainer}>
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className={styles.thumbnail}
            loading="lazy"
          />
          {video.duration && <div className={styles.duration}>{video.duration}</div>}
          <div className={styles.playButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div className={styles.videoInfo}>
          <h3 className={styles.videoTitle}>{video.title}</h3>
          <p className={styles.videoDescription}>{video.description}</p>
          <div className={styles.videoMeta}>
            <span className={styles.publishDate}>
              {new Date(video.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {video.viewCount && (
              <span className={styles.viewCount}>{video.viewCount} views</span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default function YouTube() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true);
        
        // Check if API credentials are available
        if (!YOUTUBE_CHANNEL_ID || !YOUTUBE_API_KEY) {
          console.log('YouTube API credentials not found, using fallback videos');
          setVideos(fallbackVideos);
          setLoading(false);
          return;
        }
        
        // First, get the channel's uploads playlist ID
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!channelResponse.ok) {
          throw new Error('Failed to fetch channel information');
        }
        
        const channelData = await channelResponse.json();
        const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
        
        if (!uploadsPlaylistId) {
          throw new Error('Could not find uploads playlist');
        }
        
        // Then fetch all videos from the uploads playlist
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`
        );
        
        if (!videosResponse.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const videosData = await videosResponse.json();
        
        // Transform the data to match our interface
        const fetchedVideos: YouTubeVideo[] = videosData.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        }));
        
        setVideos(fetchedVideos);
        setError(null);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('Failed to load videos from YouTube API. Showing sample videos instead.');
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };

    // Fetch YouTube videos since we have API key configured
    fetchYouTubeVideos();
  }, []);

  return (
    <Layout
      title="YouTube Videos"
      description="Watch my YouTube videos where I write terrible code so you can feel better about your coding skills!">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>My YouTube Channel</h1>
          <p className={styles.subtitle}>
            Watch me write terrible code so you'll feel better about your coding skills! 😄
          </p>
          <div className={styles.channelActions}>
            <a 
              href="https://youtube.com/@mongezikasha" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.subscribeButton}
            >
              🔔 Subscribe to My Channel
            </a>
          </div>
        </header>

        <main className={styles.main}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading videos from YouTube...</p>
            </div>
          ) : error ? (
            <div className={styles.errorMessage}>
              <p>{error}</p>
              {error.includes('API not configured') && (
                <div className={styles.setupInstructions}>
                  <h3>Setup Instructions:</h3>
                  <ol>
                    <li>Get a YouTube Data API v3 key from <a href="https://console.developers.google.com" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                    <li>Find your YouTube Channel ID from your channel URL or YouTube Studio</li>
                    <li>Add environment variable: <code>REACT_APP_YOUTUBE_API_KEY=your_api_key</code></li>
                    <li>Update the <code>YOUTUBE_CHANNEL_ID</code> in the code with your channel ID</li>
                  </ol>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.videosGrid}>
              {videos.map((video) => (
                <YouTubeVideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </main>

        <div className={styles.footer}>
          <p>
            Can't find what you're looking for? Check out my full{' '}
            <a 
              href="https://youtube.com/@mongezikasha" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              YouTube channel
            </a>{' '}
            for more content!
          </p>
        </div>
      </div>
    </Layout>
  );
}
