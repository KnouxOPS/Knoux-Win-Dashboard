import { Script } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function* simulateScriptExecution(script: Script, speed: number = 800) {
  const steps = [
    `Verifying permissions for ${script.name}...`,
    `Loading PowerShell module [${script.script}]...`,
    `Analyzing system state...`,
    `Executing core logic...`,
    `Cleaning up temporary resources...`
  ];

  if (script.admin) {
    steps.unshift(`Requesting administrative privileges... [GRANTED]`);
  }

  for (const step of steps) {
    await delay(Math.random() * speed + 200);
    yield `[${new Date().toLocaleTimeString()}] ${step}\n`;
  }

  await delay(500);
  yield `[${new Date().toLocaleTimeString()}] Operation completed successfully.\n`;
}