<form id="uploadForm" enctype="multipart/form-data" class="hero-form">
  <div class="form-group">
    <label for="username">Il tuo nome</label>
    <input type="text" name="username" required>
  </div>
  <div class="form-group">
    <label for="comment">Commento</label>
    <textarea name="comment" rows="2" required></textarea>
  </div>
  <div class="form-group">
    <label for="moment">Momento della giornata</label>
    <select name="moment" required>
      <option value="">— seleziona —</option>
      <option value="cerimonia">Cerimonia</option>
      <option value="aperitivo">Aperitivo</option>
      <option value="ricevimento">Ricevimento</option>
      <option value="taglio torta">Taglio torta</option>
      <option value="altro">Altro</option>
    </select>
  </div>
  <div class="form-group">
  <button type="button" id="chooseBtn"  class="form-btn">Scegli dal rullino</button><br>
  <button type="button" id="captureBtn" class="form-btn">Scatta foto</button><br>

  <input
    type="file" name="images[]"
    id="fileInput"
    accept="image/*"
    multiple style="display:none">

  <input
    type="file" name="images[]"
    id="cameraInput"
    accept="image/*"
    capture="environment"
    style="display:none">

  <!-- <--- aggiunto qui -->
  <div id="previewContainer" class="gallery-preview"></div>
</div>
  <button type="submit" class="form-btn">Carica!</button>
</form>
<!-- tag cloud -->
<section class="tag-cloud" id="tagCloud"></section>

<!-- griglia delle immagini -->
<section class="gallery-grid" id="galleryImages"></section>

<!-- lightbox overlay -->
<div id="lightbox-overlay">
  <span id="lightbox-close">&times;</span>
  <img id="lightbox-image" src="" alt="Expanded view" />
</div>
