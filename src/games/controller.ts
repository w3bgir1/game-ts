import {
  JsonController,
  Get,
  Post,
  HttpCode,
  BodyParam,
  Param,
  Put,
  Body,
  NotFoundError
} from "routing-controllers";
import Game from "./entity";
import { validate } from "class-validator";
import { randomColor, moves } from "./logic";

const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];

@JsonController()
export default class GameController {
  @Get("/games")
  async allGames() {
    return await Game.find();
  }

  @Post("/games")
  @HttpCode(201)
  createGame(@BodyParam("name") gameName: string) {
    const game = new Game();
    game.name = gameName;
    game.color = randomColor();
    game.board = JSON.stringify(defaultBoard);
    return game.save();
  }

  @Put("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const game = await Game.findOne(id);
    if (!game) {
      throw new NotFoundError("Cannot find page");
    }

    if (
      update.board &&
      moves(JSON.parse(game.board), JSON.parse(update.board)) !== 1
    ) {
      throw new Error(`HTTP 400 Bad Request`);
    }

    const updatedGame = Game.merge(game, update);
    const errors = await validate(updatedGame);

    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    }

    return await updatedGame.save();
  }
}
