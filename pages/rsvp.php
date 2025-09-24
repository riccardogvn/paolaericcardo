<div class="content-wrapper">
  <section class="home-hero hero-wrapper">
    <h1>RSVP</h1>
    <p>Fateci sapere se ci sarete, compilando il modulo qui sotto.</p>

    <form id="rsvpForm" action="pages/submit_rsvp.php" method="POST" class="hero-form">

      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="guests">Numero di Ospiti:</label>
        <select id="guests" name="guests">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3+">3 o più</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Richieste speciali / allergie:</label>
        <textarea id="message" name="message" rows="4"></textarea>
      </div>

      <button type="submit" class="form-btn">Invia RSVP</button>
    </form>
  </section>
</div>


