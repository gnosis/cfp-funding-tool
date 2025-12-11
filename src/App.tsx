import React from 'react'

const webApiUrl = import.meta.env.VITE_WEB_API_URL;

function App() {
  const [address, setAddress] = React.useState('');
  const [secretCode, setSecretCode] = React.useState('');
  const filled = address.length > 0 && secretCode.length > 0;
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const codeParam = urlObj.searchParams.get('code');
    const addressParam = urlObj.searchParams.get('address');
    if(codeParam){
      setSecretCode(codeParam);
    }
    if(addressParam){
      setAddress(addressParam);
    }
  }, []);

  async function getAirdrop(address: string, secretCode: string) {
    setPending(true);
    setError('');
    setMessage('');
    let rez = null;
    try {
      const body = {
          address: address,
          code: secretCode
      };
      const response = await fetch(`${webApiUrl}/api/cfp-funding-tool/airdrop`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
      });
      rez = await response.json();
    } catch (error) {
      setError('Network error. Please try again later.');
    } finally {
      setPending(false);
    }
    return rez;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await getAirdrop(address, secretCode);
    if(result?.error){
      setError(result.error);
    }
    if(result?.message){
      setMessage(result.message);
    }
    console.log('Airdrop result:', result);
  }


  return (
    <div className="App">
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
              Get your wxHOPR and xDai to test Gnosis VPN.
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
                      autoComplete="off"
                      onChange={e=>{
                        setAddress(e.target.value)
                      }}
                      value={address}
                    />
                      <div className="input-icon">
                        <i className="fas fa-wallet"></i>
                      </div>
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
                      autoComplete="off"
                      onChange={e=>{
                        setSecretCode(e.target.value)
                      }}
                      value={secretCode}
                    />
                      <div className="input-icon">
                        <i className="fas fa-key"></i>
                      </div>
                  </div>
                  <div className="error-message" id="secretCodeError"></div>
                </div>

                <button
                  type="submit"
                  className={"claim-btn" + (filled ? " filled" : " disabled")}
                  id="claimBtn"
                  onClick={handleSubmit}
                  disabled={!filled || pending}
                >
                  <div className="btn-content">
                    <div className="spinner" id="spinner"></div>
                    <span id="btnText">
                      <i className="fas fa-gift"></i>
                      {pending ? "Claiming..." : "Claim Airdrop"}
                    </span>
                  </div>
                </button>
              </form>

              <div
                className={"result" + (error ? " error" : " success")}
                id="result"
                style={{display: error || message ? 'block' : 'none'}}
              >
                <div className="result-content">
                  <div className="result-icon" id="resultIcon"></div>
                  <h3 id="resultTitle">
                    {error ? 'Error Claiming Airdrop' : 'Airdrop Successful!'}
                  </h3>
                  <p id="resultMessage">
                    {error}
                  </p>
                  <div id="resultDetails">
                    {message}
                  </div>
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
            <div className="socials">
                <a href="https://x.com/Gnosis_VPN" target="_blank" rel="noopener noreferrer" aria-label="X" className="block w-6 h-6">
                  <img alt="X logo" loading="lazy" width="24" height="24" decoding="async" src="/socials/footer_social_x.svg"/>
                </a>
                <a href="https://mastodon.social/@GnosisVPN" target="_blank" rel="noopener noreferrer" aria-label="Mastodon" className="block w-6 h-6">
                  <img alt="Mastodon logo" loading="lazy" width="24" height="24" decoding="async" src="/socials/footer_social_mastodon.svg"/>
                </a>
                <a href="https://bsky.app/profile/gnosisvpn.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Bluesky" className="block w-6 h-6">
                  <img alt="Bluesky logo" loading="lazy" width="24" height="24" decoding="async" src="/socials/footer_social_bluesky.svg"/>
                </a>
                <a href="https://warpcast.com/gnosisvpn" target="_blank" rel="noopener noreferrer" aria-label="Warpcast" className="block w-6 h-6">
                  <img alt="Warpcast logo" loading="lazy" width="24" height="24" decoding="async" src="/socials/footer_social_warpcast.svg"/>
                </a>
                <a href="https://github.com/gnosis/gnosis_vpn-client/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="block w-6 h-6">
                  <img alt="GitHub logo" loading="lazy" width="24" height="24" decoding="async" src="/socials/footer_social_github.svg"/>
                </a>
                <a href="https://discord.gg/gnosis" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="block w-6 h-6">
                  <img alt="Discord logo" loading="lazy" width="24" height="24" decoding="async" src="/socials/footer_social_discord.svg"/>
                </a>
              </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
