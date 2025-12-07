import './index.css'
import './fonts.css'


function App() {

  return (
    <body>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-coins"></i>
              <span>Gnosis VPN Airdrop</span>
            </div>
          </div>
        </div>
      </header>


      <main className="main">
        <div className="container">

          <section className="hero">
            <h1>Claim Your wxHOPR and xDai</h1>
            <p className="hero-description">
              Get your wxHOPR and xDai to use Gnosis VPN.
              Enter your wallet address and secret code to claim your airdrop.
            </p>
          </section>

          <section className="claim-section">
            <div className="form-container">
              <form id="airdropForm" className="claim-form">
                <div className="form-group">
                  <label className="recipientAddress">
                    <i className="fas fa-wallet"></i>
                    Recipient Address
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="recipientAddress"
                      name="recipientAddress"
                      placeholder="0x..."
                      required
                      autocomplete="off"
                    >
                      <div className="input-icon">
                        <i className="fas fa-wallet"></i>
                      </div>
                    </input>
                  </div>
                  <div className="error-message" id="recipientAddressError"></div>
                </div>

                <div className="form-group">
                  <label className="secretCode">
                    <i className="fas fa-key"></i>
                    Secret Code
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="secretCode"
                      name="secretCode"
                      placeholder="Enter your secret code..."
                      required
                      autocomplete="off"
                    >
                      <div className="input-icon">
                        <i className="fas fa-key"></i>
                      </div>
                    </input>
                  </div>
                  <div className="error-message" id="secretCodeError"></div>
                </div>

                <button type="submit" className="claim-btn" id="claimBtn">
                  <div className="btn-content">
                    <div className="spinner" id="spinner"></div>
                    <span id="btnText">
                      <i className="fas fa-gift"></i>
                      Claim Airdrop
                    </span>
                  </div>
                </button>
              </form>

              <div className="result" id="result">
                <div className="result-content">
                  <div className="result-icon" id="resultIcon"></div>
                  <h3 id="resultTitle"></h3>
                  <p id="resultMessage"></p>
                  <div id="resultDetails"></div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#" className="footer-link">About wxHOPR</a>
              <a href="#" className="footer-link">Gnosis VPN</a>
              <a href="#" className="footer-link">Support</a>
            </div>
            <div className="footer-text">
              <p>&copy; 2024 wxHOPR Airdrop. Powered by Gnosis Chain.</p>
            </div>
          </div>
        </div>
      </footer>

      <script src="script.js"></script>
    </body>
  )
}

export default App
