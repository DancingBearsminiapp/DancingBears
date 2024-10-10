  // Fixed exchange rate for $CoinDrop to USD
  const exchangeRate = 0.3; // 1 $CoinDrop = 1 USD

  // Function to calculate the exchange
  function calculateExchange() {
      // Get input value
      const amount = parseFloat(document.getElementById("amount").value);
  
      // Check if amount is valid
      if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid amount.");
          return;
      }
  
      // Calculate the exchanged amount
      const exchangedAmount = amount * exchangeRate;
  
      // Display the result
      document.getElementById("result").innerText = `Exchanged Amount: ${exchangedAmount.toFixed(2)} USD`;
  }
  