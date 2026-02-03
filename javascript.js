// -------- SUPABASE CLIENT -------- 
const SUPABASE_URL = "https://tlcvcaddzkbezdxkwjdh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsY3ZjYWRkemtiZXpkeGt3amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMDYwODcsImV4cCI6MjA4Mzc4MjA4N30.bqmsVXQequss4P0kivfIZycC14wS37D9R2HniOOApY4";

// uses global supabase from CDN script tag
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// -------- LOAD GALLERY --------
async function loadGalleryImages() {

  console.log("Loading gallery from Supabase...");

  const { data, error } = await client
    .storage
    .from("C2C")
    .list("", { limit: 100 });

  console.log("Supabase list result:", data, error);

  if (error) {
    console.error("LIST ERROR:", error);
    alert("Supabase list failed");
    return;
  }

  const gallery = document.getElementById("gallery");
  if (!gallery) {
    console.log("gallery div not found");
    return;
  }

  gallery.innerHTML = "";

  if (!data || data.length === 0) {
    console.log("No files in bucket");
    return;
  }

  data.forEach(file => {
    const img = document.createElement("img");
    img.src = `${SUPABASE_URL}/storage/v1/object/public/photos/${file.name}`;
    img.style.width = "200px";
    img.style.margin = "10px";
    gallery.appendChild(img);
  });

  console.log("Images added:", data.length);
}



// Load gallery ONLY on photos.html
if (window.location.pathname.includes("photos.html")) {
  loadGalleryImages();
}


// -------- AUTO LOAD ON PAGE OPEN --------
window.addEventListener("load", loadGalleryImages);
