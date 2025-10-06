# Contributing to @alpha018/nestjs-unleash-client

Thank you for your interest in contributing to `@alpha018/nestjs-unleash-client`! We appreciate your contributions and want to make the process as smooth as possible. Please follow these guidelines to ensure your contributions are integrated seamlessly into the project.

## Development Workflow

1.  **Fork the Repository:** Fork the main repository to your GitHub account.
2.  **Clone the Fork:** Clone your forked repository to your local machine.
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Create a Branch:** Create a new branch for your changes. Use a descriptive name that reflects the changes you are making (e.g., `feature/new-feature` or `fix/bug-fix`).
5.  **Make Your Changes:** Make your changes in the new branch. As you work, you can use the following commands:
    *   **To run tests:**
        ```bash
        npm run test
        ```
    *   **To check for linting errors:**
        ```bash
        npm run lint
        ```
    *   **To automatically format your code:**
        ```bash
        npm run format
        ```

## How to Contribute

1.  **Open an Issue:** Before starting work on a new feature or bug fix, we recommend opening an issue to discuss your ideas. This helps ensure that your changes align with the project's vision and avoids duplicated efforts.
2.  **Make Your Changes:** Follow the development workflow described above.
3.  **Ensure Quality:** Before submitting, please ensure that all tests pass and there are no linting errors.
4.  **Submit a Pull Request:** Once you have finished, submit a pull request from your branch to the main repository. Include a clear description of your changes and link the issue you opened.

## Contribution Guidelines

-   **Unit Tests:** Please write unit tests for all your changes. This helps us ensure code quality and prevent regressions.
-   **Documentation:** If you are adding a new feature or changing an existing one, please update the `README.md` or other relevant documentation.
-   **Coding Conventions:** The project uses Prettier and ESLint to enforce coding standards. Please run `npm run format` and `npm run lint` before committing.
-   **Commit Messages:** This project uses **Conventional Commits** for commit messages. The format is important because it is used by `semantic-release` to automatically generate changelogs and determine new version numbers. Please follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
    -   For example, use `feat: add new feature` for new features (results in a MINOR release), `fix: correct a bug` for bug fixes (results in a PATCH release), and `docs: update documentation` for documentation changes.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Contact

If you have any questions or need help, please feel free to contact us by opening an issue on GitHub.

Thank you again for your interest in contributing to `@alpha018/nestjs-unleash-client`! We look forward to seeing your contributions.
