	var canvas = document.querySelector("canvas"),
		ctx = canvas.getContext("2d"),
		x = 50,
		y = 300,
		dx = 2,
		dy = -2,
		leftKeyPressed = false,
		rightKeyPressed = false,
		paddleX = 3,
		paddleWidth = 100,
		paddleHeight = 15,
		bricks = [],
		brickPadding = 5,
		brickOffsetTop = 15,
		brickOffsetLeft = 8,
		brickColumns = 5,
		brickRows = 10,
		c = 0,
		r = 0,
		i = 0,
		brickX, brickY, brickHeight = 20,
		brickWidth = 54,
		points = 0,
		pointsCounter = document.querySelector(".container__counter__points"),
		gameOver = document.createElement("div"),
		p = document.createElement("p"),
		change = 1;



	function endGame() {
		clearInterval(a);
		gameOver.className = "container__gameOver";
		p.innerHTML = `GAME OVER!<br> You have earned ${points} points`;
		gameOver.appendChild(p);
		p.innerHTML = `GAME OVER!<br> You have earned ${points} points`;
		gameOver.appendChild(p);
		var button = document.createElement("button");
		button.className = "container__gameOver__button";
		button.textContent = "Phew, I want to try again!";
		button.addEventListener("click", function () {
			return document.location.reload(true);

		});
		gameOver.appendChild(button);
		document.querySelector(".container").appendChild(gameOver);
	}
	for (i; i < brickColumns * brickRows; i++) {
		if (i === 0 || i % brickRows === 0) {
			bricks.push([]);
		}
		bricks[Math.floor(i / brickRows)].push({
			x: 0,
			y: 0,
			status: true
		});
	}

	function drawBricks() {
		for (c = 0; c < brickColumns; c++) {
			r = 0;
			for (r; r < brickRows; r++) {
				if (bricks[c][r].status) {
					brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
					brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
					bricks[c][r].y = brickY;
					bricks[c][r].x = brickX;
					ctx.fillStyle = "rgb(0, 250, 0)";
					ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
				}
			}
		}
	}

	function collisionDetection() {
		bricks.forEach(function (a) {
			a.forEach(function (b) {
				if (b.status && x + 10 > b.x && x - 10 < b.x + brickWidth && y - 10 < b.y + brickHeight && y + 10 > b.y) {
					dy = -dy;
					b.status = false;
					points++;
					pointsCounter.textContent = points;
				}
			});

		});
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI * 2);
		ctx.fillStyle = "rgb(0, 250, 0)";
		ctx.fill();
	}

	function keyDown(e) {
		if (e.which === 39) {
			rightKeyPressed = true;
		} else if (e.which === 37) {
			leftKeyPressed = true;
		}
	}

	function keyUp(e) {
		if (e.which === 39) {
			rightKeyPressed = false;
		} else if (e.which === 37) {
			leftKeyPressed = false;
		}
	}

	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp);

	function drawPaddle() {
		ctx.fillStyle = "rgb(0, 250, 0)";
		ctx.fillRect(paddleX, canvas.height - 20, paddleWidth, paddleHeight);
	}

	function draw() {
		if (points / 10 === 1 && change % 2 === 1) {
			dy > 0 ? dy += 2 : dy -= 2;
			dx > 0 ? dx += 2 : dx -= 2;

			change++;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		x += dx;
		y += dy;
		collisionDetection();
		drawBricks();
		drawBall();
		drawPaddle();

		if (x - 10 < 0 || x + 10 > canvas.width) {
			dx = -dx;
		} else if (y - 10 < 0 || y + 10 > canvas.height) {
			dy = -dy;
		}

		if (rightKeyPressed && paddleX + paddleWidth < canvas.width) {
			paddleX += 5;
		} else if (leftKeyPressed && paddleX > 0) {
			paddleX -= 5;
		}

		if (y + 10 > canvas.height - paddleHeight) {
			if (x + 10 > paddleX && x - 10 < paddleX + paddleWidth) {
				dy = -dy;
			} else {
				endGame();
			}
		}

	}

	var a = setInterval(draw, 10);