$destDir = "c:\Users\Aadi\Downloads\restaurant-concepts\frontend\public\images"

$images = @{
  "$destDir\heroes\coquette-pantry-hero.jpg"     = "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85"
  "$destDir\heroes\retro-bodega-hero.jpg"        = "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=1200&q=85"
  "$destDir\heroes\pop-art-hero.jpg"             = "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=85"
  "$destDir\heroes\organic-earth-hero.jpg"       = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85"

  "$destDir\products\white-peach-jam.jpg"        = "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\malabar-dark-chocolate.jpg" = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\french-macarons.jpg"        = "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\strawberry-compote.jpg"     = "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\uji-matcha-tin.jpg"         = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"

  "$destDir\products\kettle-sea-salt-chips.jpg"  = "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\smoked-beef-jerky.jpg"      = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\cacao-energy-bites.jpg"     = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"

  "$destDir\products\habanero-hot-sauce.jpg"     = "https://images.unsplash.com/photo-1588615419957-2e11e86dbfa8?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\chili-crunch-jar.jpg"       = "https://images.unsplash.com/photo-1628172935293-27a3c31405fc?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\tomato-tapenade.jpg"        = "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80"

  "$destDir\products\cold-pressed-olive-oil.jpg" = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\khapli-emmer-flour.jpg"     = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\raw-forest-honey.jpg"       = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\kashmiri-walnuts.jpg"       = "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\roasted-mamra-almonds.jpg"  = "https://images.unsplash.com/photo-1508061252445-5350f31934b0?auto=format&fit=crop&w=800&q=80"
  "$destDir\products\maple-pecan-granola.jpg"    = "https://images.unsplash.com/photo-1517093157656-b9ec81615f21?auto=format&fit=crop&w=800&q=80"
}

foreach ($dest in $images.Keys) {
  $url = $images[$dest]
  Write-Host "Fetching $dest"
  curl.exe -s -L -o $dest $url
}
Write-Host "Download complete!"
