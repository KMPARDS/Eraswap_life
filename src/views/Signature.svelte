<script>
  import Navbar from "./NavBar.svelte";
  import Footer from "./Footer.svelte";
  import copy from "copy-to-clipboard";
  import { ethers } from 'ethers'
  let error_message = "";
  let message = "";
  let signature = "";
  let copied = false;
  let copied2 = false;
  let verify = false;
  let address = "";
  let verifyResult = "";
  function getUrlEncodedBody(shouldEncode) {
    const body = `Message:\n${message}\n\nDigital Signature:\n${signature}\n\nWalletAddress:\n${window.wallet.address}`;
    return shouldEncode ? encodeURIComponent(body) : body;
  }
</script>

<style>
  .social-link-signature {
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
  }
</style>

<div style="background:linear-gradient(90deg, #6b1111 0%, #170301 100%)">
  <Navbar title="Send ES" />
</div>
<div class="container mb-4">
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-6 col-12 mt-30">
      <div
        class="tm-pricebox text-center"
        style="padding-bottom: .1rem; background-color: #eee">
        <p
          on:click={() => (verify = !verify)}
          style="cursor: pointer; text-decoration: underline">
          {#if verify}Go to Sign Message{:else}Go to Verify Message{/if}
        </p>
        {#if verify}
          <h3>Verifying a message</h3>
          <p>
            On the blockchain, identity is the wallet address and not a human
            name or face. When someone signs a message, a unique signature gets
            generated for the message and their wallet. When they send you the
            message, signature and their address, using cryptography you can
            verify that it is correct.
          </p>
          <p>
            Enter the message, signature and wallet address you want to verify
            and then click on sign
          </p>
          <textarea style="width: 100%; height: 50vh" bind:value={message} />
          <br />
          <br />
          Enter signature:
          <textarea bind:value={signature} />
          <br />
          <br />
          Enter Wallet Address:
          <input type="text" bind:value={address} />
          <br />
          <br />
          <button
            on:click={async () => {
              verifyResult = '';
              if (!message) {
                verifyResult = 'Error: please enter the message';
              }
              if (!signature) {
                verifyResult = 'Error: please enter the signature';
              }
              try {
                const result = await ethers.utils.verifyMessage(message, signature
                    .split(' ')
                    .join(''));
                console.log('i m dononfm', result);
                if (address) {
                  verifyResult = result.toLowerCase() === address
                      .split(' ')
                      .join('')
                      .toLowerCase() ? `The signature is CORRECT ` : `The signature is INVALID`;
                } else {
                  verifyResult = `The address who signed this is ${result}`;
                }
              } catch (error) {
                verifyResult = `Error: ${error.message}`;
              }
            }}>
            Verify Signature
          </button>

          {#if verifyResult}
            <p
              style="padding: 10px; border: 1px solid #333; background-color:
              #ccc">
              {verifyResult}
            </p>
          {/if}
        {:else}
          <h3>Signing a message using your wallet</h3>
          <p>
            On the blockchain, identity is the wallet address and not a human
            name or face. When you sign a message, a unique signature gets
            generated for the message using your wallet's private key. You can
            use this function to prove that you have the ownership of the
            private key.
          </p>
          <p>
            Presets:
            <span
              style="cursor: pointer; border: 1px solid black; padding:
              5px;background: #ddd;"
              on:click={() => {
                message = 'I hereby declare and authorize info@eraswapfoundation.com to upgrade my pet/TSGAP stakings for the ongoing months and to be adjusted from my Prepaid / Liquid balance. I have read and understood the TimeAlly terms and conditions.\n\nFull Name: \nContact number: ';
              }}>
              <b>TimeAlly PET and TSGAP stakings</b>
            </span>
          </p>
          <p>Update your message below and then click on sign</p>
          <textarea style="width: 100%; height: 50vh" bind:value={message} />

          {#if error_message != ''}
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert">
              {error_message}
              <a href="/access-my-wallet">Here</a>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          {/if}

          <button
            on:click={async () => {
              error_message = '';
              signature = '';
              try {
                if (!window.wallet) throw new Error('Wallet not loaded. Please load your wallet.');
                signature = await window.wallet.signMessage(message);
              } catch (error) {
                error_message = error.message;
              }
            }}>
            Sign this message
          </button>

          {#if signature}
            <br />
            {#if !copied}Your signature: (click below to copy){:else}Copied{/if}
            <textarea
              style="margin-bottom: 10px"
              bind:value={signature}
              readonly
              on:click={() => {
                copy(signature);
                copied = true;
                setTimeout(() => {
                  copied = false;
                }, 1000);
              }} />

            <a
              class="social-link-signature"
              target="_blank"
              href={`mailto:info@eraswapfoundation.com?body=${getUrlEncodedBody(true)}`}>
              Send by Email App
            </a>
            <span
              class="social-link-signature"
              on:click={() => {
                copy(getUrlEncodedBody(false));
                copied2 = true;
                setTimeout(() => {
                  copied2 = false;
                }, 1000);
              }}>
              {#if !copied2}Copy Email Body{:else}Copied{/if}
            </span>
            <a
              class="social-link-signature"
              target="_blank"
              href={`whatsapp://send?text=${getUrlEncodedBody(true)}`}>
              Send by Whatsapp
            </a>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>

<Footer />
