const ExitView = () => {
  return (
    <>
      <div className="min-h-[300px] flex items-center justify-center w-full">
        no pudimos abrir el juego
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `footer, header {
              display: none;
          }`,
        }}
      />
    </>
  );
};

export default ExitView;
