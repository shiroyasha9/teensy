type CommonJokeResponse = {
  error: boolean;
  category: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: boolean;
  safe: boolean;
  lang: string;
};

export type Joke = CommonJokeResponse &
  (
    | {
        type: "single";
        joke: string;
        setup: never;
        delivery: never;
      }
    | {
        type: "twopart";
        setup: string;
        delivery: string;
        joke: never;
      }
  );
