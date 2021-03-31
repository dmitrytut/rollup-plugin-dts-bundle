import del from 'del';
import dts from 'dts-bundle';

export default function dtsBundle(options = {}) {
  const {
    hook = 'writeBundle',
    bundle: {
      out = 'typings.d.ts',
      ...restBundle
    },
    verbose = false,
    deleteOnComplete
  } = options;

  const printVerbose = (message) => {
    if (verbose) {
      if (typeof message === 'function') {
        message();
      } else {
        console.log(message);
      }
    }
  };

  return {
    name: 'dts-bundle',
    [hook]: async () => {
      printVerbose(`Typings bundling for '${restBundle.name}': ${restBundle.main} → ${out}...`);

      const result = dts.bundle({
        out,
        ...restBundle
      });

      if (result.emitted) {
        printVerbose('Typings bundle was created successfully.');

        // Run delete routine only if typings bundle was created.
        if (Array.isArray(deleteOnComplete) && deleteOnComplete.length) {
          const paths = await del(deleteOnComplete);

          printVerbose(() => {
            console.log(`Deleted files and folders after typings bundling: ${paths.length}`);

            if (paths.length) {
              paths.forEach((path) => {
                console.log(path);
              });
            }
          });
        }
      } else {
        printVerbose(
          () => console.error('Something goes wrong, typings bundle wasn\'t emitted. Result: ', result)
        );
      }
    }
  };
}
