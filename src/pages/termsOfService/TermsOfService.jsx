import React, { useEffect } from 'react'
import Title from "../../components/title/Title";
import Util from "../../assets/util";

const TermsOfService = () => {
  useEffect(() => {
    Util.updateActiveLink()
  }, [])

  return (
    <div>
      <Title title="Termos de Serviço" color="#212529" />

      <section className="content-text">
        <Title type='h2'>What is Lorem Ipsum?</Title>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard  dummy text ever since the 1500s, when an unknown printer took a galley  of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using.
        </p>

        <Title type='h2'>What is Lorem Ipsum?</Title>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard  dummy text ever since the 1500s, when an unknown printer took a galley  of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using.
        </p>

        <Title type='h2'>What is Lorem Ipsum?</Title>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard  dummy text ever since the 1500s, when an unknown printer took a galley  of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using.
        </p>
      </section>
    </div >
  );
}

export default TermsOfService;
