import React, { FC, useEffect, useState } from 'react';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import usePageTitle from '../hooks/usePageTitle';
import Canvas from '../components/Canvas';
import useInterval from '../hooks/useInterval';
import Generation from '../models/Generation';
import ControlPanel from '../components/ControlPanel';
import Social from '../components/Social';
import { useParams, useSearchParams } from 'react-router-dom';
import getConfigurationById, { DEFAULT_CONFIGURATION } from '../api/getConfigurationById';
import { CircularProgress, Container } from '@mui/material';
import useWindowWidth from '../utils/useWindowWidth';
import generationsAreEqual from '../utils/generationsAreEqual';
import CycleAlert from '../components/CycleAlert';
import ApiErrorSnackbar from '../components/ApiErrorSnackbar';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useError from '../hooks/useError';

const INITIAL_SIMULATION_DELAY = 100;

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

const Board: FC = () => {
  usePageTitle('Play');
  const windowWidth = useWindowWidth();
  const user = useLoggedInUser();
  const [, setError] = useError();

  const { configId } = useParams();
  const [searchParams] = useSearchParams();

  const [configuration, setConfiguration] = useState(DEFAULT_CONFIGURATION);
  const [configurationLoading, setConfigurationLoading] = useState(false);

  useEffect(() => {
    if (configId) {
      setConfigurationLoading(true);
      getConfigurationById(configId, searchParams.get('private') === 'true', user).then(({ config, errorMsg }) => {
        setConfiguration(config);
        setConfigurationLoading(false);
        if (errorMsg) {
          setError(errorMsg);
        }
      });
    }
  }, [configId, searchParams, setError, user]);

  const [generations, setGenerations] = useState([configuration.initialGeneration]);

  useEffect(() => {
    setGenerations([configuration.initialGeneration]);
    setBoardSize(configuration.boardSize);
  }, [configuration]);

  const toggleCell = (coordinate: Coordinate) => {
    const cur = getCurrentGenerationCoordinateSet(generations);
    if (cur.has(coordinate)) {
      setGenerations((generations) => [...generations.slice(0, -1), [...cur.delete(coordinate)]]);
    } else {
      setGenerations((generations) => [...generations.slice(0, -1), [...cur.add(coordinate)]]);
    }
  };

  const stepForward = () => {
    setGenerations((generations) => [
      ...generations,
      [...getNextGeneration(getCurrentGenerationCoordinateSet(generations))],
    ]);
  };

  const stepBackward = (): void => {
    if (generations.length > 1) {
      setGenerations((generations) => generations.slice(0, -1));
    }
  };

  const resetGenerations = (): void => {
    setGenerations([generations[0]]);
  };

  const setCurrentGenerationAsInitial = (): void => {
    setGenerations([generations.slice(-1)[0]]);
  };

  const clearBoard = (): void => {
    setGenerations([[]]);
  };

  const { running, start, stop, delay, setDelay } = useInterval(stepForward, INITIAL_SIMULATION_DELAY);

  const toggleSimulation = (): void => {
    if (running) {
      stop();
    } else {
      start();
    }
  };

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));

  const [boardSize, setBoardSize] = useState(configuration.boardSize);

  useEffect(() => {
    const lastGeneration = generations.slice(-1)[0];
    const prevGenerations = generations.slice(0, -1);
    const detectedCycle = prevGenerations.some((gen) => generationsAreEqual(gen, lastGeneration));
    setDetectedCycle(detectedCycle);
  }, [generations]);

  const [detectedCycle, setDetectedCycle] = useState(false);

  const closeCycleSnackbar = () => {
    setDetectedCycle(false);
  };

  if (configurationLoading) {
    return (
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Social generations={generations} boardSize={boardSize} />

      <CycleAlert detectedCycle={detectedCycle} closeCycleSnackbar={closeCycleSnackbar} />
      <ApiErrorSnackbar />

      <Canvas
        generation={generations[generations.length - 1]}
        boardSize={boardSize}
        canvasWidth={Math.min(1200, windowWidth)}
        showGrid
        onCellClick={toggleCell}
      />

      <ControlPanel
        onReset={resetGenerations}
        onSetCurrentGenerationAsInitial={setCurrentGenerationAsInitial}
        onClear={clearBoard}
        onStepBackward={stepBackward}
        onToggleSimulation={toggleSimulation}
        onStepForward={stepForward}
        onBoardSizeChange={setBoardSize}
        onChangeSpeed={changeSpeed}
        running={running}
        delay={delay}
        boardSize={boardSize}
      />
    </Container>
  );
};

export default Board;
