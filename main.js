const canvas = document.getElementById('aimCanvas');
    const ctx = canvas.getContext('2d');
    
    //lines 6 to 19 are about just generating random circles.
    
    const circles = [];
    const circleCount = 10;
    const circleRadius = 20;
    
    for (let i = 0; i < circleCount; i++) {
      const circle = {
        x: Math.random() * (canvas.width - 2 * circleRadius) + circleRadius,
        y: Math.random() * (canvas.height - 2 * circleRadius) + circleRadius,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color
      };
      circles.push(circle);
    }
    
    // The code to move the circles around lines 23 to 45

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
        
        circle.x += circle.dx;
        circle.y += circle.dy;
        
        if (circle.x - circleRadius < 0 || circle.x + circleRadius > canvas.width) {
          circle.dx *= -1;
        }
        if (circle.y - circleRadius < 0 || circle.y + circleRadius > canvas.height) {
          circle.dy *= -1;
        }
      });
      
      requestAnimationFrame(draw);
    }
    
    canvas.addEventListener('click', function(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance < circleRadius) {
          circles.splice(i, 1); // Remove the clicked circle from the array
          break;
        }
      }
    });
    
    draw();