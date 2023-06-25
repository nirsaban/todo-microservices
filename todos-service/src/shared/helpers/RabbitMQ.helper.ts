import amqp, { ConsumeMessage, Channel, Options } from "amqplib";

/**
 * A helper class for connecting to and interacting with RabbitMQ.
 */
export class RabbitMQHelper {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private queue: string;

  constructor(queue: string) {
    this.queue = queue;
  }

  /**
   * Establishes a connection to RabbitMQ using the connection string provided in the environment variables.
   * @returns {Promise<void>} - A promise that resolves when the connection is established.
   * @throws {Error} - If there is an error connecting to RabbitMQ.
   */
  public async connect(): Promise<void> {
    try {
      const connectionString = "amqp://localhost";
      this.connection = await amqp.connect(connectionString);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queue);
      console.log("Connected to RabbitMQ");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error.message);
      throw error;
    }
  }

  /**
   * Sends a message to the RabbitMQ queue.
   * @param {string} message - The message to send to the queue.
   * @returns {Promise<void>} - A promise that resolves when the message has been sent.
   * @throws {Error} - If there is an error sending the message to the queue.
   */
  public async sendMessage(
    message: string,
    options: Options.Publish
  ): Promise<void> {
    try {
      await this.channel.sendToQueue(this.queue, Buffer.from(message), {
        headers: { "x-delay": options.delay },
      });
      console.log("Message sent:", message);
    } catch (error) {
      console.error("Error sending message to RabbitMQ:", error.message);
      throw error;
    }
  }

  /**
   * Closes the connection to the RabbitMQ server.
   * @returns {Promise<void>} - A promise that resolves when the connection is closed.
   * @throws {Error} - If there is an error closing the connection.
   */
  public async closeConnection(): Promise<void> {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log("RabbitMQ connection closed");
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error.message);
      throw error;
    }
  }

  /**
   * Consume messages from the todo queue and execute the provided callback function on each message.
   * @param {function} cb - The callback function to execute on each message.
   * @returns {Promise<void>} - A promise that resolves when all messages have been consumed.
   */
  public async consumeTodoMessages<T>(cb: (message: T) => void): Promise<void> {
    this.channel.assertQueue(this.queue);

    console.log("Consuming");
    this.channel.consume(this.queue, (message: ConsumeMessage | null) => {
      if (message) {
        const todo = JSON.parse(message.content.toString());

        this.channel.ack(message);

        return cb(message);
      }
    });
  }
}
