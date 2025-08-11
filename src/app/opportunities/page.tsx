// ...inside the component, above the list rendering:
const [ingesting, setIngesting] = useState(false);

async function ingestNow() {
  setIngesting(true);
  try {
    // Example: SAM + an RSS feed (replace with a real feed if you have one)
    const params = new URLSearchParams({
      providers: ["sam"].join(","),   // add "rss" to include feeds
      q: "cloud devops",
      sinceDays: "14",
      limit: "10"
      // rssFeedUrl: "https://YOUR_FEED_URL"
    });
    const res = await fetch(`/api/ingest?${params.toString()}`);
    const payload = await res.json();
    setOps(payload.opportunities ?? []);
  } finally {
    setIngesting(false);
  }
}
